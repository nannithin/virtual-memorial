import he from 'he'

const TriContentQuo = ({content}) => {
    const {data,type} = content;
    if (type == "quote") {
        const decodedText = he.decode(data.text);
        const decodedCap = he.decode(data.caption);
        return (
            <div className='border-l-4 border-gray-300 pl-4'>
                <p className='italic text-gray-500 mb-1'>{decodedText.replace(/\u00A0/g, ' ')}</p>
                <p className='text-gray-500 text-right'>- {decodedCap.replace(/\u00A0/g, ' ')}</p>
            </div>
        )
    }
}

export default TriContentQuo;