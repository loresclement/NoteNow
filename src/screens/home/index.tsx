import { Text, View, TouchableOpacity } from "react-native";
import Note from "../../components/note";
import { ScrollView } from "react-native-gesture-handler";
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

   /* async function exportFile() {
        const fileName = 'monFichier.txt';
        const fileContents = 'Contenu de mon fichier';

        try{
            let dir = await ScopedStorage.openDocumentTree(true);
            console.log(dir);
    
            const dirPath = dir.uri;
            const filePath = `${dirPath}/${fileName}`;
    
            // Vérifie si le répertoire existe, sinon le crée
            const dirExists = await RNFS.exists(dirPath);
            if (!dirExists) {
                await RNFS.mkdir(dirPath);
            }
    
            // Vérifie si le fichier existe déjà dans le répertoire
            const fileExists = await RNFS.exists(filePath);
            if (fileExists) {
                console.log(`Le fichier ${fileName} existe déjà dans le répertoire`);
                return;
            }
    
            // Écrit le contenu du fichier dans le répertoire
            await RNFS.writeFile(filePath, fileContents, 'utf8');
            console.log(`Fichier enregistré à l'emplacement suivant : ${path}`);
        } catch (error) {
            console.log(`Erreur lors de la sélection du fichier ou du dossier : ${error}`);
        }
    }*/

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

    //const [drawerOpen, setDrawerOpen] = useState(false)

    return(
        <>
        {/*<Drawer
        open={drawerOpen}
        onOpen={() => setDrawerOpen(true)}
        onClose={() => setDrawerOpen(false)}
        renderDrawerContent={() => {
            return (
                <>
                    <Text>
                        Importer 
                    </Text>
                    <TouchableOpacity onPress={() => exportFile()}>
                        <Text>
                            Exporter
                        </Text>
                    </TouchableOpacity>
                </>
            );
        }}
        >
        
        <View style={{height: 60, width: '100%'}}>
            <TouchableOpacity onPress={() => setDrawerOpen(true)}>
                <Text>
                    ouvrir
                </Text>
            </TouchableOpacity>
        </View>*/}

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

    {/*</Drawer>*/}
        </>
    )
}

export default Home