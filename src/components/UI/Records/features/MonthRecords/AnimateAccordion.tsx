import { ReactNode } from 'react';
import { RecordMapWrapper } from '../../Records.styled';

interface AnimateAccordionProps {
  key: string;
  children: ReactNode;
}

const base = 4;
const time = (delay: number) => delay * base;

const AnimateAccordion = ({ children, key }: AnimateAccordionProps) => (
  <RecordMapWrapper
    key={key}
    initial={{ height: 0, opacity: 0 }}
    animate={{
      height: 'auto',
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.3,
        opacity: { delay: time(0.025) },
      },
    }}
    exit={{ height: 0, opacity: 0 }}
    transition={{
      duration: time(0.15),
      type: 'spring',
      bounce: 0,
      opacity: { duration: time(0.03) },
    }}
  >
    { children}
  </RecordMapWrapper>
);

export { AnimateAccordion };
