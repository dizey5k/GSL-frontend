'use client'

import { useState } from 'react'
import { PickemQuestion } from '@/types'
import { usePickemSubmitPick } from '@/hooks'
import { RadioGroup, Radio, Button, Input } from '@heroui/react'
import { toast } from 'sonner'
import styles from './QuestionCard.module.scss'

interface Props {
  question: PickemQuestion
  campaignId: number
  onSuccess: () => void
}

interface SubmitPickPayload {
  campaign_id: number
  question_id: number
  option_id?: number
  value_text?: string
}

export default function QuestionCard({
  question,
  campaignId,
  onSuccess,
}: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    question.my_pick?.option_id !== null &&
      question.my_pick?.option_id !== undefined
      ? String(question.my_pick.option_id)
      : null,
  )
  const [numberValue, setNumberValue] = useState<string>(
    question.my_pick?.value_text || '',
  )

  const submitPick = usePickemSubmitPick()

  const isLocked =
    question.status === 'locked' || question.status === 'resolved'
  const isResolved = question.status === 'resolved'
  const isOpen = question.status === 'open'

  const handleSubmit = () => {
    const payload: SubmitPickPayload = {
      campaign_id: campaignId,
      question_id: question.id,
    }

    if (question.answer_type === 'number') {
      if (!numberValue.trim()) {
        toast.error('Введите число')
        return
      }
      payload.value_text = numberValue.trim()
    } else {
      if (!selectedOption) {
        toast.error('Выберите вариант')
        return
      }
      payload.option_id = parseInt(selectedOption, 10)
    }

    submitPick.mutate(payload, {
      onSuccess: () => {
        toast.success('Прогноз сохранён')
        onSuccess()
      },
      onError: (err: unknown) => {
        toast.error(
          err instanceof Error ? err.message : 'Ошибка при сохранении',
        )
      },
    })
  }

  const communityPct = (optionId: number) => {
    return question.community_pct?.[optionId] || 0
  }

  const isCorrect = (optionId: number) => {
    return question.correct_option_id === optionId
  }

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{question.title}</h3>
      {question.description && (
        <p className={styles.description}>{question.description}</p>
      )}
      <div className={styles.meta}>
        <span className={styles.points}>{question.points_effective} очков</span>
        {isResolved && <span className={styles.resolved}>✓ Разрешён</span>}
        {isLocked && !isResolved && (
          <span className={styles.locked}>🔒 Закрыт</span>
        )}
        {isOpen && <span className={styles.open}>Открыт</span>}
        {question.closes_at && isOpen && (
          <span className={styles.closesAt}>
            До {new Date(question.closes_at).toLocaleString('ru-RU')}
          </span>
        )}
      </div>

      {isResolved && (
        <div className={styles.correctAnswer}>
          Правильный ответ:{' '}
          {question.correct_option_id
            ? question.options.find((o) => o.id === question.correct_option_id)
                ?.label
            : question.correct_value}
        </div>
      )}

      {!isResolved && (
        <div className={styles.form}>
          {question.answer_type === 'number' ? (
            <Input
              type="number"
              placeholder="Введите число"
              value={numberValue}
              onChange={(e) => setNumberValue(e.target.value)}
              disabled={!isOpen || isLocked}
              className={styles.numberInput}
            />
          ) : (
            <RadioGroup
              name={`question-${question.id}`}
              value={selectedOption ?? ''}
              onChange={setSelectedOption}
              isDisabled={!isOpen || isLocked}
              className={styles.radioGroup}
              variant="primary"
            >
              {question.options.map((opt) => {
                const pct = communityPct(opt.id)
                const correct = isResolved && isCorrect(opt.id)
                const isUserPick = selectedOption === String(opt.id)
                return (
                  <Radio
                    key={opt.id}
                    value={String(opt.id)}
                    className={styles.radioItem}
                  >
                    <Radio.Content className={styles.radioContent}>
                      <Radio.Control className={styles.radioControl}>
                        <Radio.Indicator />
                      </Radio.Control>

                      <div className={styles.radioLabel}>
                        <span>{opt.label}</span>

                        {pct > 0 && (
                          <span className={styles.percentage}>{pct}%</span>
                        )}

                        {correct && (
                          <span className={styles.correctMark}>✓</span>
                        )}

                        {isUserPick && !isResolved && (
                          <span className={styles.userPick}>Ваш выбор</span>
                        )}
                      </div>
                    </Radio.Content>
                  </Radio>
                )
              })}
            </RadioGroup>
          )}

          {isOpen && !isLocked && (
            <Button
              variant="primary"
              isDisabled={submitPick.isPending}
              onClick={handleSubmit}
            >
              {submitPick.isPending
                ? 'Сохранение...'
                : question.my_pick
                  ? 'Изменить прогноз'
                  : 'Проголосовать'}
            </Button>
          )}
        </div>
      )}

      {question.my_pick && isResolved && (
        <div className={styles.myPickResult}>
          Ваш прогноз:{' '}
          {question.my_pick.option_id
            ? question.options.find((o) => o.id === question.my_pick?.option_id)
                ?.label
            : question.my_pick?.value_text}
          {question.my_pick.is_correct !== null && (
            <span
              className={
                question.my_pick.is_correct ? styles.correct : styles.incorrect
              }
            >
              {question.my_pick.is_correct ? '✓ Верно' : '✗ Неверно'}
            </span>
          )}
          {question.my_pick.points_earned > 0 && (
            <span className={styles.earnedPoints}>
              +{question.my_pick.points_earned} очков
            </span>
          )}
        </div>
      )}
    </div>
  )
}
