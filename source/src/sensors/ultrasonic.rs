use embedded_hal::digital::v2::{InputPin, OutputPin};
use cortex_m::asm::delay;

pub struct Ultrasonic<T, E> {
    trig: T,
    echo: E,
}

impl<T, E> Ultrasonic<T, E>
where
    T: OutputPin,
    E: InputPin,
{
    /// ### 创建一个新的超声波传感器对象.
    /// #### 参数
    /// - trig 触发引脚
    /// - echo 回声引脚
    /// #### 返回值
    /// 超声波传感器对象
    pub fn new(trig: T, echo: E) -> Self {
        Self { trig, echo }
    }

    /// ### 获取传感器距目标的距离.
    /// #### 参数
    /// - 无
    /// #### 返回值
    /// 目标距离，单位为厘米.
    /// 失败时返回 None.
    pub fn read_distance(&mut self) -> Option<f32> {
        let _ = self.trig.set_low();
        delay(500);
        let _ = self.trig.set_high();
        delay(5000);
        let _ = self.trig.set_low();

        let mut timeout = 50_000;
        while self.echo.is_low().ok()? {
            timeout -= 1;
            if timeout == 0 {
                return None;
            }
        }

        let mut count: u32 = 0;
        while self.echo.is_high().ok()? {
            count += 1;
            if count > 300_000 {
                return None;
            }
        }

        Some(count as f32 * 0.017)
    }
}

pub struct UltrasonicArray<T1, T2, T3> {
    pub front: T1,
    pub left: T2,
    pub right: T3,
}

impl<T1, U2, U3> UltrasonicArray<T1, U2, U3> {
    pub fn new(front: T1, left: U2, right: U3) -> Self {
        Self { front, left, right }
    }
}