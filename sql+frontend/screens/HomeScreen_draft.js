import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import { getLatestScoreHistory } from '../db/scoreHistory';
import { useFocusEffect } from '@react-navigation/native';
import { getLeaderboard } from '../api/leaderboard';

const HomeScreen = ({ navigation }) => {
  const [userScore, setUserScore] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(null); // store battery level for sharing
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getLatestScoreHistory().then((result) => {
        if (result !== null) {
          setUserScore(result.score);
          setBatteryLevel(result.batteryLevel);
          setLoading(false);
        }
      });

      // Fetch Top 3 Leaders
      getLeaderboard().then((data) => {
        const top3 = data.slice(0, 3);
        setLeaderboard(top3);
      });
    }, [])
  );

  // 🟪 Social Sharing logic
  const handleShare = async () => {
    try {
      const message = `🌟 My current GravityFit score is ${userScore}!\n🔋 Battery level: ${batteryLevel ?? 'N/A'}%\nJoin me on GravityFit and stay strong! 💪`;

      const result = await Share.share(
        { message },
        {
          dialogTitle: 'Share your GravityFit achievement',
          subject: 'My GravityFit Score',
        }
      );

      if (result.action === Share.sharedAction) {
        console.log('✅ Score shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('ℹ️ Share dismissed');
      }
    } catch (error) {
      console.error('❌ Error sharing:', error.message);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return '';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>GravityFit</Text>
        <Ionicons name="person-circle-outline" size={32} color="#fff" />
      </View>

      {/* Circular Progress */}
      <View style={styles.gaugeContainer}>
        <AnimatedCircularProgress
          size={150}
          width={15}
          fill={userScore}
          tintColor="#4BC0C0"
          backgroundColor="#1e3d4f"
          arcSweepAngle={240}
          rotation={240}
          lineCap="round"
        >
          {() => <Text style={styles.gaugeText}>{`${userScore}%`}</Text>}
        </AnimatedCircularProgress>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Difficulty')}>
        <Text style={styles.buttonText}>Start Workout</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Progress</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Achievement</Text>
      </TouchableOpacity>

      {/* Leaderboard Preview */}
      <Text style={styles.leaderboardTitle}>🏆 Top Performers</Text>
      {leaderboard.length === 0 ? (
        <Text style={styles.leaderboardItem}>No data available.</Text>
      ) : (
        leaderboard.map((user, index) => (
          <Text key={index} style={styles.leaderboardItem}>
            {getMedal(index)} {(typeof user.username === 'string' ? user.username : JSON.stringify(user.username))} - {user.score}
          </Text>
        ))
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
        <Text style={[styles.leaderboardItem, { color: '#7C3AED', marginTop: 8 }]}>
          View Full Leaderboard →
        </Text>
      </TouchableOpacity>

      {/* 🟪 Social Sharing */}
      <TouchableOpacity style={[styles.button, { backgroundColor: '#7C3AED', marginTop: 20 }]} onPress={handleShare}>
        <Text style={styles.buttonText}>📤 Share My Score</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#132935',
    padding: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  gaugeContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  gaugeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#7d90b3',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  leaderboardTitle: {
    marginTop: 24,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  leaderboardItem: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 2,
  },
});

export default HomeScreen;
