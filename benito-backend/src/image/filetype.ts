
export const detectImageType = async (buffer) => {
    const imageType = await import('image-type');

    return await imageType.default(buffer)
}
