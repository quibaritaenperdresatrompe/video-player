import Icon from '../';

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations';

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'with a known iconName props',
    props: {
      iconName: 'PlayIcon',
    },
  },
  {
    name: 'with an unknown iconName props',
    props: {
      iconName: 'UnknownIcon',
    },
  },
  {
    name: 'with all props',
    props: {
      color: '#fff',
      hoverColor: '#000',
      iconName: 'PlayIcon',
      size: '3em',
    },
  },
];

describe(Icon.name, () => {
  itRendersAllMutations(Icon, mutations);
});
