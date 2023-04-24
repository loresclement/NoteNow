import { Text, View, TouchableOpacity } from "react-native";
import Note from "../../components/note";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import PlusLogo from "../../logos/plus.svg"
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import StorageService from "../../../utils/storageService";
import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Add: { noteId: string } | undefined;
};

function Home()
{
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    interface Note {
        id: string;
        title: string;
        content: string;
        "creation-date": number;
        "modification-date": number;
    }

    const [noteList, setNoteList] = useState<Note[]>([])

    useEffect(() => 
    {
        async function retrieveNoteList()
        {
            const noteList = await StorageService.getData("note")
            setNoteList(noteList)
        }
        
        retrieveNoteList()

    }, [noteList])

    const addNote = (noteId: string) => 
    {
        navigation.navigate('Add', {noteId})
    }

    return(
        <>
        <View style={{backgroundColor: 'white', flex: 1}}>
            <ScrollView>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', 
                            justifyContent: 'space-between'}}>
                    {noteList.length === 0 && 
                    <Text style={{color: 'black', margin: 20, fontSize: 17}}>
                        Add your first note !
                    </Text>}
                    {noteList.map((note) => 
                        <TouchableOpacity key={note.id} style={{width: '45%', margin: 10, height: 190}}
                                          onPress={() => addNote(note.id)}>
                            <Note
                            title={note.title} 
                            id={note.id} 
                            content={note.content}/>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>

        <TouchableOpacity onPress={() => addNote('')} style={{position: 'absolute', bottom: 0, right: 0, 
                            backgroundColor: 'lightgray', margin: 10, 
                            borderRadius: 50, padding: 15}}>
                <PlusLogo width={50} height={50}/>
        </TouchableOpacity>
        </>
    )
}

export default Home