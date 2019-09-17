function insertionSort(valuesToSort) {
  for (let i = 0; i < valuesToSort.length; i++) {
    let temp = valuesToSort[i];
    let j = i - 1;
    while (j >= 0 && valuesToSort[j] > temp) {
      valuesToSort[j + 1] = valuesToSort[j];
      j--;
    }
    valuesToSort[j + 1] = temp;
  }
  return valuesToSort;
}

function bubbleSort(valuesToSort) {
  for (let i = 0; i < valuesToSort.length; i++) {
    for (let j = 0; j < valuesToSort.length - i - 1; j++) {
      if (valuesToSort[j] > valuesToSort[j + 1]) {
        let temp = valuesToSort[j];
        valuesToSort[j] = valuesToSort[j + 1];
        valuesToSort[j + 1] = temp;
      }
    }
  }
}

function selectionSort(valuesToSort) {
  for (let i = 0; i < valuesToSort.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < valuesToSort.length; j++) {
      if (valuesToSort[j] < valuesToSort[min]) {
        min = j;
      }
    }
    if (min != i) {
      let temp = valuesToSort[i];
      valuesToSort[i] = valuesToSort[min];
      valuesToSort[min] = temp;
    }
  }
}