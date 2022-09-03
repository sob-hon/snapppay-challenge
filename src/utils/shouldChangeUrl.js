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
    return false;
  } else return true;
};

export { shouldChangeUrl };
