var arr = [5, 6, 65, 62, 8, 25, 2, 3, 4, 41]


function selection(arr) {
    for (var i = 0; i < arr.length; i++) {
        var minIndex = i;
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        temp = arr[i]
        arr[i] = arr[minIndex]
        arr[minIndex] = temp

    }
    return arr
}

console.log(selection(arr))
