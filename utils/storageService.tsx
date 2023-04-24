import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService 
{
  public static async storeData(key: string, value: any) 
  {
    try 
    {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } 
    catch (e)
    {

    }
  };

  public static async getData(key: string): Promise<any[]> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return [];
      }
    } catch (e) {
      return [];
    }
  }

  public static async removeData(key: string)
  {
    try 
    {
      await AsyncStorage.removeItem(key);
    } 
    catch (e)
    {

    }
  };
}

export default StorageService;
