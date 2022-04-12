import { Button, Center, Modal } from "native-base";

export function UploadDocs({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Function;
}) {
  return (
    <Center>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Uplaod File</Modal.Header>
          <Modal.Body>
            <input type="file" />
            <p>click to select files</p>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Upload
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
