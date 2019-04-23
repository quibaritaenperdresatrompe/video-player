import RangeBar from '../';

import itRendersAllMutations from '../../../utils/jest-it-renders-all-mutations';

const mutations = [
  {
    name: 'without props',
    props: null,
  },
  {
    name: 'without currentValue and maxValue',
    props: {
      currentValue: 9,
      maxValue: 10,
    },
  },
  {
    name: 'when it is at the end',
    props: {
      currentValue: 10,
      maxValue: 10,
    },
  },
  {
    name: 'whith all props',
    props: {
      color: '#fff',
      currentValue: 10,
      maxValue: 10,
      setTo: jest.fn(),
      size: '3em',
    },
  },
];

describe(RangeBar.name, () => {
  itRendersAllMutations(RangeBar, mutations);

  describe('handlers', function scope() {
    beforeEach(() => {
      this.RangeBar = new RangeBar();
    });

    describe('handleChange', () => {
      test('it calls props.setTo', () => {
        this.RangeBar.props = {
          setTo: jest.fn(),
        };
        const event = { target: { value: 99 } };
        this.RangeBar.handleChange(event);
        expect(this.RangeBar.props.setTo).toHaveBeenCalledWith(event.target.value);
      });
    });
  });
});
