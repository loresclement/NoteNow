import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View, TextInput } from "react-native";
import SaveLogo from '../../logos/save.svg'
import BinLogo from '../../logos/bin.svg'
import BackLogo from '../../logos/back.svg'
import Popup from "../../components/popup";
import { useEffect, useRef, useState } from "react";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';
import StorageService from "../../../utils/storageService";
import dayjs from 'dayjs';
import { useRoute } from '@react-navigation/native';

function AddNote()
{
    const navigation = useNavigation()
    const route = useRoute();
    const { noteId } = route.params as {noteId: string};

    interface Note {
        id: string;
        title: string;
        content: string;
        "creation-date": number;
        "modification-date": number;
    }
      
    const [loadedNote, setLoadedNote] = useState<Note>();
    const [noteList, setNoteList] = useState<Note[]>([])
    const [deletePopupVisible, setDeletePopupVisible] = useState(false)
    const [content, setContent] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    const contentInputRef = useRef<TextInput>(null)
    const titleInputRef = useRef<TextInput>(null)

    useEffect(() => 
    {
        async function retrieveNote()
        {
            const noteList = await StorageService.getData("note")
            setLoadedNote(noteList.find(obj => obj.id == noteId))
            setNoteList(noteList)
        }

        if(noteId !== undefined)
            retrieveNote()
    
    }, [noteId])

    useEffect(() => 
    {
        if(loadedNote !== undefined)
        {
            setTitle(loadedNote.title)
            setContent(loadedNote.content)
        }
    }, [loadedNote])

    const cancel = () => 
    {
        saveNote()
        navigation.navigate("Home" as never)
    }

    const openDeleteNote = () => 
    {
        setDeletePopupVisible(true)
    }

    function deleteNote(response: boolean)
    {
        setDeletePopupVisible(false)

        if(response)
        {
            saveInStorage(noteList.filter(item => item.id !== loadedNote?.id))
            navigation.navigate("Home" as never)
        }
    }

    const saveNote = () => 
    {
        if(loadedNote === undefined)
        {
            const uniqueId = uuid.v4();
            const timestamp = Date.now();
            
            const note = {
              id: uniqueId,
              title: title,
              content: content,
              "creation-date": timestamp,
              "modification-date": timestamp,
            };

            const noteListJoined = noteList.concat(note as Note)
            saveInStorage(noteListJoined)
        }
        else 
        {
            const timestamp = Date.now()

            const updatedData = noteList.map((note) => {
                if (note.id === loadedNote.id) {
                  return {
                    ...note,
                    id: loadedNote.id,
                    title: title,
                    content: content,
                    "creation-date": loadedNote["creation-date"],
                    "modification-date": timestamp
                  };
                } else {
                  return note;
                }
            });

            const updateNoteList = updatedData
            saveInStorage(updateNoteList)
        }
    }

    async function saveInStorage(noteList: Note[])
    {
        await StorageService.storeData("note", noteList)
        navigation.navigate("Home" as never)
    }

    return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>

                <TouchableOpacity onPress={cancel}>
                    <BackLogo width={40} height={40}/>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {loadedNote !== undefined && <TouchableOpacity onPress={openDeleteNote}>
                        <BinLogo width={25} height={25} style={{marginRight: 20}}/>
                    </TouchableOpacity>}

                    <TouchableOpacity onPress={saveNote}>
                        <SaveLogo width={30} height={30}/>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback
                                      style={{width: '100%', height: 100}}>
                <View style={{flex: 1}}>
                    <TextInput
                        style={{fontSize: 30, margin: 10, textAlign: 'left', color: 'black'}}
                        ref={titleInputRef}
                        value={title}
                        multiline={true}
                        onChangeText={setTitle}
                        placeholder="Title..."
                        maxLength={30}
                    />
                </View>
            </TouchableWithoutFeedback>

            <View style={{marginLeft: 10, marginBottom: 5}}>
                <Text style={{color: 'gray'}}>
                    {loadedNote !== undefined && ('Created :' + dayjs(loadedNote["creation-date"]).format('DD/MM/YYYY HH[h]mm'))}  
                </Text> 
                
                <Text style={{color: 'gray'}}>
                    {loadedNote !== undefined && ('Modified :' + dayjs(loadedNote["modification-date"]).format('DD/MM/YYYY HH[h]mm'))}  
                </Text>
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
                <View style={{height: 4, width: '90%',  borderRadius: 50,backgroundColor: 'lightgray'}}/>
            </View>

            <ScrollView>
                <TextInput
                    style={{fontSize: 15, margin: 10, color: 'black', height: '100%'}}
                    ref={contentInputRef}
                    value={content}
                    multiline={true}
                    onChangeText={setContent}
                    autoFocus={false}
                    placeholder="Note..."
                />
            </ScrollView>

            {deletePopupVisible && <Popup visible={deletePopupVisible} callback={deleteNote}/>}
        </View>
    )
}

export default AddNote;