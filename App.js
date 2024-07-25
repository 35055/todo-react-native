// App.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import useStore from './store';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const { tasks, addTask, editTask, deleteTask, toggleTaskStatus } = useStore();

  const handleSave = () => {
    if (taskId) {
      editTask({ id: taskId, name: taskName, description: taskDescription, completed: false });
    } else {
      addTask({ id: Date.now().toString(), name: taskName, description: taskDescription, completed: false });
    }
    setTaskName('');
    setTaskDescription('');
    setTaskId(null);
    setModalVisible(false);
  };

  const handleEdit = (task) => {
    setTaskId(task.id);
    setTaskName(task.name);
    setTaskDescription(task.description);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Task" onPress={() => setModalVisible(true)} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Text style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.name}</Text>
            <Button title={item.completed ? 'Undo' : 'Complete'} onPress={() => toggleTaskStatus(item.id)} />
            <Button title="Edit" onPress={() => handleEdit(item)} />
            <Button title="Delete" onPress={() => deleteTask(item.id)} />
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Task Name"
            value={taskName}
            onChangeText={setTaskName}
            style={styles.input}
          />
          <TextInput
            placeholder="Task Description"
            value={taskDescription}
            onChangeText={setTaskDescription}
            style={styles.input}
          />
          <Button title="Save" onPress={handleSave} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  task: {
    padding: 16,
    borderBottomWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default App;
