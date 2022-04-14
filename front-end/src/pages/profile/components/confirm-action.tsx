import { Button, FormControl, Modal } from "native-base";

export function ConfirmAction({
  modalVisible,
  setModalVisible,
  uploadDetails,
}: {
  modalVisible: boolean;
  setModalVisible: Function;
  uploadDetails: Function;
}) {
  return (
    <Modal isOpen={modalVisible} onClose={setModalVisible} size={"md"}>
      <Modal.Content maxH="350">
        <Modal.CloseButton />
        <Modal.Header>Please Confirm</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>
              {"You're updating your documents, Are you sure you want to do it"}
            </FormControl.Label>
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setModalVisible(false);
              }}>
              cancel
            </Button>
            <Button
              bgColor="blueGray.800"
              _hover={{ bgColor: "blueGray.600" }}
              onPress={() => {
                uploadDetails();
                setModalVisible(false);
              }}>
              Yes
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
