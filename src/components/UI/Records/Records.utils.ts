import { IndebtedPeople } from '../../../globalInterface';

export const getIndebtedPeopleWithoutId = (person: IndebtedPeople) => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _id, ...restValuesPerson } = person;
  return restValuesPerson;
};
