export function arraysAreTheSame(array1, array2) {
    if (!array1 || !array2) {
        return false;
    }

    const sameLength = array1.length == array2.length;

    if (!sameLength) {
        return false;
    }

    let didPassTest = true;

    for (let i = 0; i < array1.length; i++) {
        didPassTest = array1[i] === array2[i];

        if (!didPassTest) {
            return false;
        }
    }

    return true;
}