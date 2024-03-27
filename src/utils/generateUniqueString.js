import { customAlphabet } from 'nanoid'

const generateUniqueString = (length) => {
    const nanoid = customAlphabet('12345abc', length || 10)
    return nanoid()
}

export default generateUniqueString