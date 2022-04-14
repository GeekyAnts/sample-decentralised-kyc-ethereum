import {
  Button,
  Center,
  FormControl,
  Input,
  Modal,
  Spinner,
} from "native-base";
import { useEffect, useState } from "react";
import { useApi } from "../../../hooks/useApi";
import { Customer } from "../../../repository";
import { toastError } from "../../../utils";

export const EditProfileModal = ({
  data,
  showModal,
  setShowModal,
}: {
  data: Customer;
  showModal: boolean;
  setShowModal: Function;
}) => {
  const [freshData, setFreshData] = useState<Customer>({} as Customer);
  const { updateProfile } = useApi();
  const [loader, setLoader] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      setFreshData(data);
    }
  }, [data]);

  const reset = () => {
    setShowModal(false);
    setFreshData({} as Customer);
  };

  const validate = () => {
    if (!freshData.name) {
      toastError("Name is required");
      return false;
    } else if (!freshData.email.includes("@") || !freshData.email) {
      toastError("Email is invalid");
      return false;
    } else if (
      freshData.mobileNumber.length < 10 ||
      freshData.mobileNumber.length > 10
    ) {
      toastError("Invalid phone no");
      return false;
    }
    return true;
  };

  const updateMyProfile = async () => {
    if (validate()) {
      setLoader(true);
      await updateProfile(
        freshData.name,
        freshData.email,
        freshData.mobileNumber
      );

      setShowModal(false);
      setLoader(false);
    }
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={reset}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Update Your Details</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                value={freshData.name}
                onChangeText={(text) =>
                  setFreshData((currentData: Customer) => {
                    return { ...currentData, name: text };
                  })
                }
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input
                value={freshData.email}
                onChangeText={(text) =>
                  setFreshData((currentData: Customer) => {
                    return { ...currentData, email: text };
                  })
                }
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Phone Number</FormControl.Label>
              <Input
                value={freshData.mobileNumber}
                onChangeText={(text) =>
                  setFreshData((currentData: Customer) => {
                    return { ...currentData, mobileNumber: text };
                  })
                }
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  reset();
                }}>
                Cancel
              </Button>

              <Button
                isDisabled={loader ? true : false}
                bgColor="blueGray.800"
                _hover={{ bgColor: "blueGray.600" }}
                onPress={() => {
                  updateMyProfile();
                }}>
                {loader ? (
                  <Spinner accessibilityLabel="Loading posts" />
                ) : (
                  "Save"
                )}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
};
