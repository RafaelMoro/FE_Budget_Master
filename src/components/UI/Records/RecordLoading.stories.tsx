import { ComponentStory, ComponentMeta } from '@storybook/react';
import { RecordLoading } from './RecordLoading';

export default {
  title: 'UI/Record',
  component: RecordLoading
} as ComponentMeta<typeof RecordLoading>;

export const RecordLoadingSkeleton: ComponentStory<typeof RecordLoading> = () => (
  <RecordLoading />
);