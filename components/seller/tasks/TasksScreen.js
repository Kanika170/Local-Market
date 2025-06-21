import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../theme/useTheme';
import { createSellerStyles } from '../../../styles/sellerStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TasksScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const styles = createSellerStyles(theme);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      type: 'stock',
      priority: 'high',
      title: 'Low Stock Alert',
      description: 'Parle-G Biscuit is running low (3 units left)',
      action: 'Update Stock',
      icon: 'alert-circle',
      color: theme.colors.error,
      completed: false,
    },
    {
      id: 2,
      type: 'review',
      priority: 'medium',
      title: 'Respond to Review',
      description: 'Customer left a 3-star review for Tata Salt',
      action: 'View Review',
      icon: 'star-half-full',
      color: theme.colors.warning,
      completed: false,
    },
    {
      id: 3,
      type: 'message',
      priority: 'high',
      title: 'Pending Messages',
      description: '3 unread messages from customers',
      action: 'View Messages',
      icon: 'message-alert',
      color: theme.colors.error,
      completed: false,
    },
    {
      id: 4,
      type: 'product',
      priority: 'low',
      title: 'Update Product Info',
      description: 'Add description for Fortune Oil',
      action: 'Edit Product',
      icon: 'package-variant',
      color: theme.colors.info,
      completed: false,
    },
    {
      id: 5,
      type: 'promotion',
      priority: 'medium',
      title: 'Create Promotion',
      description: 'Diwali sale post is performing well, create similar content',
      action: 'Create Post',
      icon: 'bullhorn',
      color: theme.colors.secondary,
      completed: false,
    },
  ]);

  const handleTaskAction = (task) => {
    switch (task.type) {
      case 'stock':
        navigation.navigate('Products', { screen: 'StockManagement' });
        break;
      case 'review':
        navigation.navigate('Settings', { screen: 'Reviews' });
        break;
      case 'message':
        navigation.navigate('Chat', { screen: 'ChatDashboard' });
        break;
      case 'product':
        navigation.navigate('Products', { screen: 'ProductsList' });
        break;
      case 'promotion':
        navigation.navigate('Feed', { screen: 'CreatePost' });
        break;
      default:
        Alert.alert('Action', `Performing action for: ${task.title}`);
    }
  };

  const markTaskCompleted = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return theme.colors.error;
      case 'medium':
        return theme.colors.warning;
      case 'low':
        return theme.colors.info;
      default:
        return theme.colors.text.tertiary;
    }
  };

  const TaskItem = ({ task }) => (
    <View style={[styles.card, { 
      marginBottom: 12,
      opacity: task.completed ? 0.6 : 1,
      borderLeftWidth: 4,
      borderLeftColor: task.color,
    }]}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: `${task.color}20`,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}>
          <Icon name={task.icon} size={20} color={task.color} />
        </View>
        
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={[styles.cardTitle, { 
              textDecorationLine: task.completed ? 'line-through' : 'none' 
            }]}>
              {task.title}
            </Text>
            <View style={{
              backgroundColor: getPriorityColor(task.priority),
              paddingHorizontal: 6,
              paddingVertical: 2,
              borderRadius: 8,
              marginLeft: 8,
            }}>
              <Text style={{ 
                color: theme.colors.white, 
                fontSize: 10, 
                fontWeight: 'bold' 
              }}>
                {task.priority.toUpperCase()}
              </Text>
            </View>
          </View>
          
          <Text style={[styles.cardSubtitle, { marginBottom: 12 }]}>
            {task.description}
          </Text>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              style={{
                backgroundColor: task.color,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 6,
                flex: 1,
                marginRight: 8,
              }}
              onPress={() => handleTaskAction(task)}
              disabled={task.completed}
            >
              <Text style={{ 
                color: theme.colors.white, 
                fontSize: 12, 
                textAlign: 'center',
                fontWeight: '500',
              }}>
                {task.action}
              </Text>
            </TouchableOpacity>
            
            {!task.completed && (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.success,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 6,
                }}
                onPress={() => markTaskCompleted(task.id)}
              >
                <Icon name="check" size={16} color={theme.colors.white} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: 50 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tasks & Alerts</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Summary */}
      <View style={{ 
        flexDirection: 'row', 
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: theme.colors.background,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
      }}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.cardValue, { fontSize: 20, color: theme.colors.error }]}>
            {pendingTasks.length}
          </Text>
          <Text style={styles.cardSubtitle}>Pending</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.cardValue, { fontSize: 20, color: theme.colors.success }]}>
            {completedTasks.length}
          </Text>
          <Text style={styles.cardSubtitle}>Completed</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.cardValue, { fontSize: 20, color: theme.colors.primary }]}>
            {tasks.length}
          </Text>
          <Text style={styles.cardSubtitle}>Total</Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        {/* Pending Tasks */}
        {pendingTasks.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>
              Pending Tasks ({pendingTasks.length})
            </Text>
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </>
        )}

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { marginTop: 24, marginBottom: 16 }]}>
              Completed Tasks ({completedTasks.length})
            </Text>
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </>
        )}

        {/* Empty State */}
        {tasks.length === 0 && (
          <View style={{ 
            alignItems: 'center', 
            justifyContent: 'center', 
            paddingVertical: 60 
          }}>
            <Icon name="check-all" size={60} color={theme.colors.success} />
            <Text style={[styles.cardTitle, { marginTop: 16, textAlign: 'center' }]}>
              All caught up!
            </Text>
            <Text style={[styles.cardSubtitle, { textAlign: 'center', marginTop: 8 }]}>
              No pending tasks at the moment
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TasksScreen;
