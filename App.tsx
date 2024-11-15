import React, { useEffect, useState } from 'react';
import { View, Button, Alert, TextInput, Text, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';
import Loader from './loader';

const App = () => {

  const [data, setData] = useState({})
  const [file, setFile] = useState(null);
  const [apiResp, setApiResp] = useState({})
  const [showLoader, setShowLoader] = useState(false)


  const pickFile = async () => {
    try {
      // Open document picker to select a PDF file
      let result = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      // Check if the file is within the size limit
      if (result?.[0]?.size <= 10 * 1024 * 1024) { // 10 MB in bytes
        setFile(result[0]);
      } else {
        Alert.alert('Error', 'File size exceeds 10 MB limit.');
        setFile(null)
        setApiResp({})
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Info', 'Upload resume to proceed');
        setFile(null)
        setApiResp({})
      } else {
        console.error('DocumentPicker Error:', err);
        setFile(null)
        setApiResp({})
      }
    }
  };

  const uploadFile = async () => {
    setShowLoader(true)
    const formData = new FormData();
    formData.append('doc', {
      uri: file.uri,
      type: file.type,
      name: file.name,
    });

    try {
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      const response = await axios.post(data.apiUrl, formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      // console.log('Response:', response.data, response.status);
      if (response.status / 1 == 200) {
        setApiResp(response.data)
      }
      else {
        Alert.alert('Error', 'Failed to parse resume');
        setApiResp({})
      }
      setShowLoader(false)
    } catch (error) {
      // console.log("errorr========>", error);
      Alert.alert('Error', 'Failed to parse resume');
      setShowLoader(false)
      setApiResp({})
    }
  };

  return (<ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
    <Loader visible={showLoader} />
    <TextInput placeholder='Enter API URL' value={data.apiUrl} onChangeText={txt => {
      setData({ ...data, apiUrl: txt })
    }} />
    <Button title="Pick Resume PDF" onPress={pickFile} />
    <Text style={{ margin: 10 }}>{file?.name}</Text>
    {data.apiUrl && file?.name ?
      <Button title="Parse Resume" onPress={uploadFile} /> : null}
    {Object.keys(apiResp).length && file?.name ? <>
      <Text style={{ margin: 10 }}>{`JSON Extracted From Resume\n\n`}{JSON.stringify(apiResp, null, 2)}</Text>
    </> : null}
  </ScrollView>
  );
};

export default App;