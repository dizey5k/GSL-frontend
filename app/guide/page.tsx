import styles from './Guide.module.scss'
import { DiscordIcon } from '@/components'
import { metadata } from './metadata'

export { metadata }

export default function GuidePage() {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Гайд по рейтингу GSL и тир-листу Majestic RP
        </h1>
        <p className={styles.heroSub}>
          Гайд GSL — как попасть в тир-лист и HLTV Majestic GTA.
          <br />
          Для дуэлей зайдите в Discord и следуйте инструкциям ниже.
        </p>
      </section>

      {/* Основной контент */}
      <div className={styles.content}>
        <p className={styles.sectionHeading}>Пройти тестирование</p>
        <p className={styles.sectionDesc}>
          Если вы хотите принять участие в тир-листе, вам нужно пройти процедуру
          регистрации через наш Discord. После этого вам откроется доступ к
          очереди на дуэли.
        </p>

        <div className={styles.timeline}>
          <div className={styles.step}>
            <div className={styles.stepMarker}>1</div>
            <p className={styles.stepTitle}>Зайти в дискорд</p>
            <p className={styles.stepDesc}>
              Вам сперва нужно зайти в GSL.BEST а получить роль Лист. После
              прохождения теста рейтинга вначале зайти в канал Регистрация,
              написать свой никнейм и дождаться подтверждения. После того как вы
              прошли тест, вам станет доступен канал Очередь в Discord.
            </p>
            <div className={styles.stepImg}>
              <div className={styles.stepImgPlaceholder}>
                <DiscordIcon width={56} height={56} />
              </div>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepMarker}>2</div>
            <p className={styles.stepTitle}>Очередь</p>
            <p className={styles.stepDesc}>
              Вам необходимо дождаться пока не начнётся сбор в очередь. Раз
              попав в очередь вы будете ожидать дуэль с кем-то из участников
              тир-листа. Для входа в очередь необходимо написать нашему боту
              команду в Bot канале.
            </p>
            <div className={styles.stepImg}>
              <div className={styles.stepImgPlaceholder}>
                <DiscordIcon width={56} height={56} />
              </div>
            </div>
          </div>

          {/* Шаг 3 */}
          <div className={styles.step}>
            <div className={styles.stepMarker}>3</div>
            <p className={styles.stepTitle}>Дуэль</p>
            <p className={styles.stepDesc}>
              После того как вас приняли в очередь, бот автоматически подбирает
              вам противника. Матч проходит на оговоренных условиях. Результат
              фиксируется системой и влияет на ваш ELO рейтинг в тир-листе.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
