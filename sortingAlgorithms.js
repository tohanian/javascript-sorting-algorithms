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
