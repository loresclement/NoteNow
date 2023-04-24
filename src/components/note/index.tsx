import { useEffect, useState } from "react";
import { View, Text } from "react-native"

interface NoteProps
{
    id: string;
    title: string;
    content: string;
}

function Note(props: NoteProps)
{
    const {id, title, content} = props
    const [shortenedContent, setShortenedContent] = useState<string>()

    useEffect(() =>
    {
        setShortenedContent(content.length > 100 ? (content.substring(0, 100) + "...") : content)
    }, [content])

    return(
        <View style={{width: '100%', height: '100%', 
        borderRadius: 15, padding: 15, backgroundColor: '#ffff99'}}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 25}}>
                {title}
            </Text>

            <Text style={{fontSize: 15, opacity: 1, color: 'black', marginTop: 5}}>
                {shortenedContent}
            </Text>
        </View>
    )
}

export default Note