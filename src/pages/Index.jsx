import { useState } from 'react';
import { Box, Button, Input, List, ListItem, IconButton, useColorModeValue, Heading, Text, VStack, HStack, Checkbox } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const bg = useColorModeValue('gray.100', 'gray.700');

  const addTask = () => {
    if (input) {
      setTasks([...tasks, { id: Date.now(), text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <VStack p={5}>
      <Heading mb="8">Todo App</Heading>
      <HStack>
        <Input
          placeholder="Add a new task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <IconButton
          icon={<FaPlus />}
          onClick={addTask}
          colorScheme="blue"
          aria-label="Add task"
        />
      </HStack>
      <List spacing={3} w="100%" mt="4">
        {tasks.map(task => (
          <ListItem key={task.id} bg={bg} p={4} borderRadius="lg">
            <HStack justifyContent="space-between">
              <Checkbox isChecked={task.isCompleted} onChange={() => toggleCompletion(task.id)}>
                <Text as={task.isCompleted ? 'del' : 'span'}>{task.text}</Text>
              </Checkbox>
              <IconButton
                icon={<FaTrash />}
                onClick={() => deleteTask(task.id)}
                colorScheme="red"
                aria-label="Delete task"
              />
            </HStack>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;