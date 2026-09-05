import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { colors, fonts } from '../constants/theme';

const ProfileScreen = ({ favorites }) => {
  return (
    <View style={styles.container}>

      <View style={styles.profileHeader}>

        <View style={styles.avatar}>
        </View>

        <Text style={styles.nameText}>
          MEHAK WALI
        </Text>

        <Text style={styles.handleText}>
          @mehakwy · joined 2026
        </Text>

      </View>

      <View style={styles.statsContainer}>

        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            142
          </Text>

          <Text style={styles.statLabel}>
            WATCHED
          </Text>
        </View>


        <View style={styles.divider} />


        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            {favorites.length}
          </Text>

          <Text style={styles.statLabel}>
            FAVORITES
          </Text>
        </View>


        <View style={styles.divider} />


        <View style={styles.stat}>
          <Text style={styles.statNumber}>
            16
          </Text>

          <Text style={styles.statLabel}>
            WATCHLIST
          </Text>
        </View>

      </View>

      <Text style={styles.sectionTitle}>
        ACCOUNT
      </Text>


      <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>

        <View style={styles.iconBox}>
          <Ionicons
            name="pencil"
            size={15}
            color={colors.text}
          />
        </View>

        <Text style={styles.menuText}>
          Edit profile
        </Text>

        <Ionicons
          name="chevron-forward"
          size={15}
          color={colors.muted}
        />

      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>

        <View style={styles.iconBox}>
          <Ionicons
            name="heart-outline"
            size={15}
            color={colors.text}
          />
        </View>

        <Text style={styles.menuText}>
          Favorites
        </Text>

        <Ionicons
          name="chevron-forward"
          size={15}
          color={colors.muted}
        />

      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>

        <View style={styles.iconBox}>
          <Ionicons
            name="bookmark-outline"
            size={15}
            color={colors.text}
          />
        </View>

        <Text style={styles.menuText}>
          Watchlist
        </Text>

        <Ionicons
          name="chevron-forward"
          size={15}
          color={colors.muted}
        />

      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>

        <View style={styles.iconBox}>
          <Ionicons
            name="moon-outline"
            size={15}
            color={colors.text}
          />
        </View>

        <Text style={styles.menuText}>
          Theme
        </Text>

        <Ionicons
          name="chevron-forward"
          size={15}
          color={colors.muted}
        />

      </TouchableOpacity>

      <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>

        <View style={styles.iconBox}>
          <Ionicons
            name="log-out-outline"
            size={15}
            color={colors.text}
          />
        </View>

        <Text style={styles.menuText}>
          Logout
        </Text>

        <Ionicons
          name="chevron-forward"
          size={15}
          color={colors.muted}
        />

      </TouchableOpacity>

    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: colors.ink,
  },

  profileHeader: {
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 25,
  },

  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
    backgroundColor: colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
  },

 

  nameText: {
    color: colors.text,
    fontSize: 25,
    fontFamily: fonts.display,
    marginBottom: 5,
  },

  handleText: {
    color: colors.muted,
    fontSize: 12,
    fontFamily: fonts.mono,
  },


  statsContainer: {
    height: 85,
    marginHorizontal: 14,
    borderRadius: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surface2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },

  stat: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  statNumber: {
    color: colors.gold,
    fontSize: 20,
    fontFamily: fonts.display,
    marginBottom: 5,
  },

  statLabel: {
    color: colors.muted,
    fontSize: 8,
    fontFamily: fonts.mono,
  },

  divider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.surface2,
  },



  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontFamily: fonts.display,
    marginTop: 27,
    marginLeft: 14,
    marginBottom: 10,
  },



  menuRow: {
    height: 58,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconBox: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  menuText: {
    flex: 1,
    color: colors.text,
    fontSize: 14,
    fontFamily: fonts.body,
  },

});