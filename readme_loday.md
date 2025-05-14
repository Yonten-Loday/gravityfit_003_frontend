From Josh's progress:
1. completed progress screen
    Install react-native-chart-kit: npm install react-native-chart-kit react-native-svg

    Line chart:   
        -Label: Weekly GravityFit Score
        -Source: scoreHistory
    stack bar chart:
        -Label: Workout Frequency
        -Source: scoreHistory
    Summary Section
        -bestScore: Highest score ever from history
        -avgFormRating: Static for now ("Good") – can be computed later
        -totalMinutes: We assume 15 mins per workout entry
2. Progress screen 
    npm install @react-navigation/native @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-vector-icons react-native-svg react-native-circular-progress

3.  Leaderboard screen
    in home screen:  import { getLeaderboard } from '../api/leaderboard';
    update home screen to acccomodate top 3 leaders in the homescreen


4. social sharing
    added HandleShare() and the share button in HomeScreen.js and Exercise screen 
    Screenshot-based sharing: npx expo install react-native-view-shot [not implemented yet]
	
   
5. Exercise Screen
    add sound and animation
    npx expo install expo-audio ----sounds 
    add sounds from  freesound.org 
    *not working*
    visual feedback implemented 

6. Home screen 
    color gradients, buttons

7. Difficulty screen
    buttons, removed those icons, added dynamic motivational qouates 

8. ExerciseListScreen 
    addded thumnails. 

9. ExerciseDetails screen 
    added thumbnails, videos from company website.

10. company logo added to login and signup page.

    

**NOTE** some of the updated files are named the same and the original file you sent are named "_draft" in the end, just some of them (eg Difficulty screen)