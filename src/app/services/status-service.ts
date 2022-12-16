const statusService = (currStatus: string, type: string) => {
  let newStatus = 'new';

  if (type === 'upgrade') {
    if (currStatus === 'new') {
      newStatus = 'inProgress';
    }

    if (currStatus === 'inProgress') {
      newStatus = 'completed';
    }
  }

  if (type === 'degrade') {
    if (currStatus === 'completed') {
      newStatus = 'inProgress';
    }

    if (currStatus === 'inProgress') {
      newStatus = 'new';
    }
  }
  return newStatus;
};

export default statusService;
