import { List, Modal } from '@react95/core';
import { Inetcpl1313 } from '@react95/icons';

const Map = ({ onClose }) => {
  return (
    <Modal
      closeModal={onClose}
      style={{ width: '300px', height: '200px' }}
      icon={<Inetcpl1313 variant="48x48_4"/>      }
      title="MyMountainFinder.exe"
      defaultPosition={{
        x: Math.floor(window.innerWidth / 2) + 20,
        y: Math.floor(window.innerHeight / 2) - 120,
      }}
      menu={[
        {
          name: 'Options',
          list: (
            <List width="200px">
              <List.Item onClick={onClose}>Close</List.Item>
            </List>
          ),
        },
      ]}
    >
      <h1>Coming soon.</h1>
    </Modal>
  );
};

export default Map;