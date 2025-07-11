import he from 'he';



const List = ({style,items}) => {
    return (
        <ol className={`pl-7 md:pl-10 ${style == 'ordered' ? "list-decimal" : "list-disc"} my-5 md:my-9`}>
            {
                items.map((item,i) => {
                    return <li key={i} className="my-4">{item.content}</li>
                })
            }
        </ol>
    )
}


const TriContent = ({ content }) => {
    console.log(content)
    let {type,data} = content;
    if(type == 'paragraph'){
        const decodedText = he.decode(data.text);
        return <p>{decodedText.replace(/\u00A0/g, ' ')}</p>
    }
    if(type == 'header'){
        const decodedText = he.decode(data.text);
        let st = 'text-xl';
        if(data.level == 1){
            st = 'text-3xl'
        }else if(data.level == 2){
            st = 'text-2xl'
        }
        return <h1 className={`${st} font-bold`}>{decodedText.replace(/\u00A0/g, ' ')}</h1>
    }

    if(type == "list"){
        return <List style={data.style} items={data.items}/>
    }
    
}

export default TriContent;