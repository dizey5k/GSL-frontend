import { PickemCampaign } from '@/types'
import styles from './CampaignHeader.module.scss'

interface Props {
  campaign: PickemCampaign
}

export default function CampaignHeader({ campaign }: Props) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{campaign.title}</h1>
      {campaign.subtitle && (
        <p className={styles.subtitle}>{campaign.subtitle}</p>
      )}
      {campaign.description && (
        <p className={styles.description}>{campaign.description}</p>
      )}
      {campaign.settings?.hero_badge && (
        <span className={styles.badge}>{campaign.settings.hero_badge}</span>
      )}
    </div>
  )
}
