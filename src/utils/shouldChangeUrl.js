const shouldChangeUrl = ({
  initialSearchOption,
  initialSearchValue,
  initialOrder,
  initialSkip,
}) => {
  if (
    initialSearchOption !== 'first_name' &&
    initialSearchValue !== '' &&
    initialOrder !== 'ASC' &&
    initialSkip !== 1
  ) {
    return true;
  } else return false;
};

export { shouldChangeUrl };
