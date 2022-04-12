import { Button, Modal, Text } from "native-base";

export function ConfirmAction({
  modalVisible,
  setModalVisible,
  heading,
  setApproval,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  heading: string;
  setApproval: Function;
}) {
  return (
    <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
      <Modal.Content maxH="212">
        <Modal.CloseButton />
        <Modal.Header>{heading}</Modal.Header>
        <Modal.Body>
          <Text>This action can not be undone!</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}
            >
              cancel
            </Button>
            <Button
              bg={"danger.600"}
              onPress={() => {
                setApproval();
              }}
            >
              ok
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
