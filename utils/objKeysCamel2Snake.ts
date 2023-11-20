interface optionsInterface {
    arrayToStringSeparator?: string,
    isArrayToString?: boolean,
}

interface dynamicObj { [key: string]: any }

module.exports =  (obj: dynamicObj, options?: optionsInterface) => {
    const arrayToStringSeparator = options?.arrayToStringSeparator || ',';
    const isArrayToString = options?.isArrayToString;

    return Object.entries(obj).reduce((acc: dynamicObj, val: [string, any]) => {
        let [key, value]: [string, any] = val
        const formattedKey = key.split(/(?=[A-Z])/).join('_').toLowerCase()
        const isValValidArray = Array.isArray(value) && !!value.length;
        const isNeedToTransformVal = isValValidArray && isArrayToString;

        if (isNeedToTransformVal) value = value.join(arrayToStringSeparator)

        acc[formattedKey] = value

        return acc
    }, {})
}
