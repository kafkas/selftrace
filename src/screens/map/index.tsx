import React, { useState } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import i18n from 'i18n-js';
import { BlurView } from 'expo-blur';
import CoronaMap from '../../components/CoronaMap';
import Text from '../../components/Text';
import * as API from '../../api';
import ReactUtils from '../../util/ReactUtils';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';
import styles from './styles';
import Icon from '../../components/Icon';

const mapStateToProps = (state: ReduxRoot) => ({
  wellbeing: state.auth.userInfo.wellbeing,
  progress: state.auth.userInfo.progress,
});

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
}

interface Props extends ReturnType<typeof mapStateToProps> {}

function MapScreen({ wellbeing }: Props) {
  const [state, setState] = useState<State>({ clusters: [], isLoading: false });

  async function handleRegionChange(regionObj: RegionObject) {
    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const receivedClusters = await API.requestClusters(regionObj);
      setState({
        clusters: receivedClusters.map(cluster => ({
          key: ReactUtils.generateListKey(),
          data: cluster,
        })),
        isLoading: false,
      });
    } catch (err) {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }

  const wellbeingIsDefined = !!wellbeing;

  return (
    <View style={styles.container}>
      {wellbeingIsDefined ? (
        <CoronaMap
          clusters={state.clusters}
          onRegionChangeComplete={handleRegionChange}
          style={styles.mapContainer}
        />
      ) : (
        <>
          <CoronaMap
            clusters={[]}
            pitchEnabled={false}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            style={styles.mapContainer}
          />
          <BlurView tint='dark' intensity={75} style={styles.blurView}>
            <View style={styles.warningContainer}>
              <Icon name='lock' color='white' style={styles.lockIcon} />
              <Text style={styles.warningTitle}>
                {i18n.t('screens.map.chooseWellbeingTitle')}
              </Text>
              <Text style={styles.warningMessage}>
                {i18n.t('screens.map.chooseWellbeingMessage')}
              </Text>
            </View>
          </BlurView>
        </>
      )}
    </View>
  );
}

export default connect(mapStateToProps, {})(MapScreen);
