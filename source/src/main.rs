#![no_std]
#![no_main]

use cortex_m_rt::entry;
use panic_halt as _;

use stm32f1xx_hal::{pac, prelude::*};

#[entry]
fn main() -> ! {
    // 获取外设访问接口句柄
    let dp = pac::Peripherals::take().unwrap();
    let cp = cortex_m::Peripherals::take().unwrap();
    let mut rcc = dp.RCC.constrain();
    let mut afio = dp.AFIO.constrain(&mut rcc);
    let mut delay = cp.SYST.delay(&rcc.clocks);
    // 获取 GPIO 通道句柄
    let mut gpioa = dp.GPIOA.split(&mut rcc);
    let mut gpiob = dp.GPIOB.split(&mut rcc);
    let mut gpioc = dp.GPIOC.split(&mut rcc);
    // 关闭 JTAG 并获取释放引脚句柄
    let (pa15_released, pb3_released, pb4_released) =
        afio.mapr.disable_jtag(gpioa.pa15, gpiob.pb3, gpiob.pb4);
    
    // todo)) 假设电源开关连接于 PA15, 使能开关连接于 PB3, 板载指示灯连接于 PB4
    let mut pb4_led = pb4_released.into_push_pull_output(&mut gpiob.crl);
    let mut pa15_power = pa15_released.into_pull_up_input(&mut gpioa.crh);
    let mut pb3_enable = pb3_released.into_pull_up_input(&mut gpiob.crl);
    
    loop {
        if pa15_power.is_high() && pb3_enable.is_high() {
            pb4_led.set_high();
        } else { 
            pb4_led.set_low();
        }
        delay.delay_us(1000_u32);
    }
}