#![no_std]
#![no_main]

mod sensors;

use cortex_m_rt::entry;
use panic_halt as _;
use log::info;
use stm32h7xx_hal::{
    pac, prelude::*
};
use core::fmt::Write;

use sensors::ultrasonic::{Ultrasonic, UltrasonicArray};

#[entry]
fn main() -> ! {
    info!("System initializing...");
    // 获取外设访问接口句柄
    let dp = pac::Peripherals::take().unwrap();
    let cp = cortex_m::Peripherals::take().unwrap();
    let mut rcc = dp.RCC.constrain();
    let mut pwr = dp.PWR.constrain();
    let mut pwrcfg = pwr.freeze();
    let ccdr = rcc.sysclk(100.MHz()).freeze(pwrcfg, &dp.SYSCFG);
    let mut delay = cp.SYST.delay(ccdr.clocks);

    // 获取 GPIO 通道句柄
    let mut gpioa = dp.GPIOA.split(ccdr.peripheral.GPIOA);
    let mut gpiob = dp.GPIOB.split(ccdr.peripheral.GPIOB);
    let mut gpioc = dp.GPIOC.split(ccdr.peripheral.GPIOC);
    
    info!("System initialized.");
    info!("Configuring peripherals...");
    // 配置超声波传感器句柄
    let ultrasonic_front = Ultrasonic::new(
        gpiob.pb7.into_push_pull_output(),
        gpiob.pb6.into_floating_input(),
    );
    let ultrasonic_left = Ultrasonic::new(
        gpiob.pb5.into_push_pull_output(), 
        gpiob.pb4.into_floating_input(),
    );
    let ultrasonic_right = Ultrasonic::new(
        gpioc.pc7.into_push_pull_output(),
        gpioc.pc6.into_floating_input(),
    );
    let mut ultrasonic = UltrasonicArray::new(
        ultrasonic_front,
        ultrasonic_left,
        ultrasonic_right,
    );

    // 配置调试串口句柄
    let debugger_tx = gpioa.pa9.into_alternate();
    let debugger_rx = gpioa.pa10.into_alternate();
    let debugger = dp.USART1.serial(
        (debugger_tx, debugger_rx), 
        115200.bps(), 
        ccdr.peripheral.USART1, 
        &ccdr.clocks);
    let (mut debugger_tx, debugger_rx) = debugger.unwrap().split();

    // 配置蓝牙串口句柄
    let bluetooth_tx = gpioa.pa2.into_alternate::<7>();
    let bluetooth_rx = gpioa.pa3.into_alternate::<7>();
    let bluetooth = dp.USART2.serial(
        (bluetooth_tx, bluetooth_rx), 
        9600.bps(), 
        ccdr.peripheral.USART2, 
        &ccdr.clocks);
    let (mut bluetooth_tx, bluetooth_rx) = bluetooth.unwrap().split();
    info!("Peripherals configured.");

    info!("main loop starting...");
    // 主循环
    loop {
        info!("Reading ultrasonic distances...");
        
        writeln!(debugger_tx, "Front: {:?} cm, Left: {:?} cm, Right: {:?} cm", 
            ultrasonic.front.read_distance(), 
            ultrasonic.left.read_distance(), 
            ultrasonic.right.read_distance()
        ).unwrap();
        writeln!(bluetooth_tx, "F:{:?},L:{:?},R:{:?}", 
            ultrasonic.front.read_distance(), 
            ultrasonic.left.read_distance(), 
            ultrasonic.right.read_distance()
        ).unwrap();
        
        info!("Distances sent.");

        delay.delay_us(1000_u32);
    }
}
