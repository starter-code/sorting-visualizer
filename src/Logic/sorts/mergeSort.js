import _ from 'lodash';
import uniqueKey from 'unique-key';
import { swap } from '../helpers';

export const mergeSort = unsortedArray => {
  const changes = [];
  const input = _.map(unsortedArray, (value, index) => ({
    value,
    index,
    uniqueKey: uniqueKey(),
  }));
  simulateMergeSort(input, changes);
  const phases = simulateMergeSortChanges(changes, [...input]);

  return phases;
};

function simulateMergeSort(unsortedArray, changes) {
  // does a merge sort
  // keep track of unique keys associated with each array element
  // keeps track of specific sub array that merge sort is processing
  // swaps on elements on the fly inside of sub array
  // pushes changes onto changes
  // simula
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }

  const middle = Math.floor(unsortedArray.length / 2);
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  return simulateMergeSortHelper(
    simulateMergeSort(left, changes),
    simulateMergeSort(right, changes),
    changes,
    unsortedArray.length,
  );
}

function simulateMergeSortHelper(left, right, changes, maxLength) {
  // @todo: refactor while loop
  const index = {
    left: 0,
    right: 0,
    copy: 0,
  };
  const copy = [...left, ...right];
  const output = [];

  while (index.left < left.length && index.right < right.length) {
    if (left[index.left].value < right[index.right].value) {
      calculateSwap(left, copy, index, changes, 'left');
      output.push(left[index.left]);
      index.left++;
    } else {
      calculateSwap(right, copy, index, changes, 'right');
      output.push(right[index.right]);
      index.right++;
    }
  }

  return [...output, ...left.slice(index.left), ...right.slice(index.right)];
}

function simulateMergeSortChanges(changes, array) {
  const phases = [];
  _.each(changes, change => {
    // find corresponding item in array
    const keysToFind = {
      mostLeftItemToReplace: change.mostLeftItemToReplace.uniqueKey,
      itemToSwap: change.itemToSwap.uniqueKey,
    };

    const availableLeftIndex = _.findIndex(
      array,
      item => item.uniqueKey === keysToFind.mostLeftItemToReplace,
    );

    const replacedIndex = _.findIndex(
      array,
      item => item.uniqueKey === keysToFind.itemToSwap,
    );

    swap(availableLeftIndex, replacedIndex, array);
    phases.push([..._.map(array, ({ value }) => value)]);
  });

  return phases;
}

function calculateSwap(array, copy, index, changes, indexKey) {
  const data = {
    itemToSwap: array[index[indexKey]],
    mostLeftItemToReplace: copy[index.copy],
    log: `swap ${array[index[indexKey]].value} with ${copy[index.copy].value}`,
  };

  const swapIndex = _.findIndex(
    copy,
    item => item.uniqueKey === data.itemToSwap.uniqueKey,
  );
  swap(swapIndex, index.copy, copy);
  changes.push(data);
  index.copy++;
}
