var arr = [5, 6, 65, 62, 8, 25, 2, 3, 4, 41]


function bubble(arr) {
    var temp
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }

    }
    return arr
}

console.log(bubble(arr))
