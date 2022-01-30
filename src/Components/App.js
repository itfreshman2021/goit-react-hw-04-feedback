import { useState } from 'react';
import Section from './section/Section';
import FeedbackOptions from './feedback/FeedbackOptions';
import Statistics from './statistics/Statistics';
import Notification from './notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleAddVoute = e => {
    const { name } = e.target;
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;

      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;

      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        return;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    let countPositiveFeedback = 0;

    countPositiveFeedback = (good / countTotalFeedback()) * 100;
    if (!isFinite(countPositiveFeedback)) {
      return 0;
    }

    return countPositiveFeedback.toFixed(0);
  };

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleAddVoute} />
      </Section>
      {countTotalFeedback() > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      ) : (
        <Section title="Statistics">
          <Notification message="No feedback given" />
        </Section>
      )}
    </>
  );
}
