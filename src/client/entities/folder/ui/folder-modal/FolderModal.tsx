import React, { useRef, useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {
  useGetFolderQuery,
  useUpdateFolderMutation
} from '@/entities/folder/api-slices';
import type { FolderDto } from '@/entities/folder/types';

type Props = {
  folderId: string,
  onHide: () => void;
};

const FolderModal = (props: Props) => {
  const { folderId, onHide } = props;

  const titleRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FolderDto | null>(null);

  const [updateFolder] = useUpdateFolderMutation();

  const { data: folderData } = useGetFolderQuery(folderId, {
    refetchOnMountOrArgChange: true
  });

  useEffect(() => {
    if (folderData) {
      setFormData(folderData);
    }
  }, [folderData]);

  const onSave = () => {
    updateFolder({
      id: folderId,
      title: titleRef.current?.value,
    });
    onHide();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return ReactDOM.createPortal(
    <Modal show onHide={onHide}>

      <Modal.Header closeButton>
        <Modal.Title>
          <b>Edit folder</b>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>

            <Form.Control
              ref={titleRef}
              type="text"
              defaultValue={formData?.title}
              disabled={formData === null}
              maxLength={30}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onSave}>
          Save changes
        </Button>

        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>

    </Modal>, document.body
  );
}

export default FolderModal;