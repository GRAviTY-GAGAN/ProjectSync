import useCustomToast, { StatusEnum } from '@/Hooks/useCustomToast';
import { CREATE_TASK, DELETE_ATTACHMENTS } from '@/graphql/queries';
import { useMutation } from '@apollo/client';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner
} from '@chakra-ui/react';
import Image from 'next/image';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FaRegCalendar, FaRegUserCircle } from 'react-icons/fa';
import { FiTarget } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import labelIcon from '../../assets/icons/material-label.svg';
import trendingUp from '../../assets/icons/material-trending-up.svg';
import './addTaskModal.scss';

const AddTaskModal = ({ isOpen, onClose }: any) => {
  const [labelValue, setLabelValue] = useState<string>('');
  const [show, setShow] = useState<string>('show');
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredFile, setHoveredFile] = useState<string>('');
  const [hoveredlabel, setHoveredLabel] = useState<string>('');
  const [callToast] = useCustomToast();

  const [createTask] = useMutation(CREATE_TASK);
  const [deleteAttachments] = useMutation(DELETE_ATTACHMENTS);

  // Data Fields
  const [title, setTitle] = useState<string>('');
  const [priority, setPriority] = useState<string>('Low');
  const [labels, setLabels] = useState<string[]>([]);
  const [points, setPoints] = useState<number>(1);
  const [assignee, setAssignee] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [filesSelected, setFilesSelected] = useState<File[] | any>([]);
  const [description, setDescription] = useState<string>('');

  function handleAddLabel(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const inputElement = e.target as HTMLInputElement;

      // Ensure that the target is an HTMLInputElement
      if (inputElement instanceof HTMLInputElement) {
        const labelEntries = [...labels];
        labelEntries.push(inputElement.value);
        setLabels(labelEntries);
        setLabelValue('');
      }
    }
  }

  function closeModal() {
    setLabels([]);
    setLabelValue('');
    setFilesSelected([]);
    setPoints(0);
    onClose();
  }

  function handleFileInput(e: ChangeEvent<HTMLInputElement>) {
    let files = e.target.files;
    if (files) {
      const filesArray = Array.from(files);
      setFilesSelected(filesArray);
    }
  }

  function showCross(name: string, type: string) {
    setShow('show');
    type === 'file' && setHoveredFile(name);
    type === 'label' && setHoveredLabel(name);
  }

  function hideCross() {
    setShow('hide');
    setHoveredFile('');
    setHoveredLabel('');
  }

  function removeFile(fileName: string) {
    let files = filesSelected;
    files = files.filter((file: File) => fileName !== file?.name);
    setFilesSelected(files);
  }

  function removeLabel(labelName: string) {
    let newLabels = labels;
    newLabels = newLabels.filter((label, i) => label + i !== labelName);
    setLabels(newLabels);
  }

  async function saveTask() {
    setLoading(true);
    const createTaskDto = {
      name: title,
      priority,
      label: labels,
      storyPoints: points,
      assignee,
      dueDate,
      attachments: filesSelected,
      description
    };

    if (title) {
      // Notify task creation has started
      callToast({ title: 'Task creation started', status: StatusEnum.info });

      // Upload attachments only if any attachments are attached
      if (filesSelected.length) {
        const uploadedAttachments = await uploadAttachments();
        createTaskDto.attachments = uploadedAttachments;
      }

      createTask({ variables: { createTaskDto } })
        .then(res => {
          const data = res.data?.createTask;
          callToast({
            title: data.message,
            status: data.status ? StatusEnum.success : StatusEnum.warning
          });
        })
        .catch(err => {
          console.error(err);
          callToast({
            title: 'Something went wrong while creating Task!!',
            status: StatusEnum.error
          });
          const attachments = createTaskDto.attachments;

          // Delete attachments only if there were any attachments selected and uploaded
          filesSelected.length &&
            deleteAttachments({ variables: { attachments } }).catch(err => {
              console.error('Something went wrong while deleting attachments');
            });
        })
        .finally(() => {
          setLoading(false);
          closeModal();
        });
    } else {
      setLoading(false);
    }
  }
  async function uploadAttachments() {
    if (filesSelected.length) {
      const fileUpload = filesSelected.map((file: any) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ProjectSync');
        return fetch(`${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD}`, {
          method: 'POST',
          body: formData
        })
          .then(res => res.json())
          .then(response => {
            return {
              secureUrl: response.secure_url,
              assetId: response.asset_id,
              publicId: response.public_id
            };
          })
          .catch(err => {
            console.error(err);
          });
      });

      try {
        const uploads = await Promise.all(fileUpload);
        // Filter out failed uploads
        const successfulUploads = uploads.filter(Boolean);
        return successfulUploads;
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <Modal size={'xl'} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="add-task-title">Project Name</ModalHeader>
          <ModalCloseButton className="add-task-close" />
          <ModalBody>
            <div className="add-modal-task-title">
              <input
                onChange={e => setTitle(e.target.value)}
                type="text"
                placeholder="Enter task title"
              />
            </div>
            <div className="add-modal-task-details">
              <div className="add-modal-detail">
                <div>
                  <Image
                    className="add-modal-icon"
                    src={trendingUp}
                    alt="trending-up"
                  />
                  <div>Priority</div>
                </div>
                <div className="add-modal-values">
                  <Menu>
                    <MenuButton>{priority}</MenuButton>
                    <MenuList style={{ display: 'block' }}>
                      <MenuItem onClick={() => setPriority('Low')}>
                        Low
                      </MenuItem>
                      <MenuItem onClick={() => setPriority('Medium')}>
                        Medium
                      </MenuItem>
                      <MenuItem onClick={() => setPriority('High')}>
                        High
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="add-modal-detail">
                <div>
                  <Image
                    className="add-modal-icon"
                    src={labelIcon}
                    alt="label"
                  />
                  <div>Label</div>
                </div>
                <div className="add-task-label-value add-modal-values">
                  <input
                    type="text"
                    placeholder="+ Add label"
                    onKeyDown={handleAddLabel}
                    value={labelValue}
                    onChange={e => setLabelValue(e.target.value)}
                  />
                  <div className="add-modal-label">
                    {labels.map((label, i) => (
                      <div
                        onMouseEnter={() => showCross(label, 'label')}
                        onMouseLeave={hideCross}
                        className="add-modal-label-wrap"
                        key={i + label}
                      >
                        <span>{label}</span>
                        <span
                          onClick={() => removeLabel(label + i)}
                          className={hoveredlabel === label ? show : ''}
                        >
                          <RxCross2 />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="add-modal-detail">
                <div>
                  <div className="add-modal-icon">
                    <FaRegUserCircle />
                  </div>
                  <div>Assignee</div>
                </div>
                <div className="add-modal-values">
                  <Menu>
                    <MenuButton>{assignee || 'Select Assignee'}</MenuButton>
                    <MenuList style={{ display: 'block' }}>
                      <MenuItem onClick={() => setAssignee('James Green')}>
                        James Green
                      </MenuItem>
                      <MenuItem onClick={() => setAssignee('Emma Willis')}>
                        Emma Willis
                      </MenuItem>
                      <MenuItem onClick={() => setAssignee('Tom Grey')}>
                        Tom Grey
                      </MenuItem>
                      <MenuItem onClick={() => setAssignee('')}>Clear</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
              <div className="add-modal-detail">
                <div>
                  <div className="add-modal-icon">
                    <FaRegCalendar />
                  </div>
                  <div>Due date</div>
                </div>
                <div className="add-modal-values">
                  <input
                    type="date"
                    onChange={e => setDueDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="add-modal-detail">
                <div>
                  <div className="add-modal-icon">
                    <FiTarget />
                  </div>
                  <div>Story Points</div>
                </div>
                <div className="add-modal-values">
                  <Menu size={'small'}>
                    <MenuButton>{points || 'Points'}</MenuButton>
                    <MenuList style={{ display: 'block' }}>
                      {Array.from(new Array(13).fill(0)).map((item, index) => (
                        <MenuItem
                          onClick={() => setPoints(index + 1)}
                          key={index + 1}
                          value={index + 1}
                        >
                          {index + 1}
                        </MenuItem>
                      ))}
                      <MenuItem onClick={() => setPoints(0)}>Clear</MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
            <div className="add-modal-attachments">
              <h2>Attachments</h2>
              <div className="add-modal-files">
                {filesSelected.map((file: File) => (
                  <div
                    onMouseEnter={() => showCross(file.name, 'file')}
                    onMouseLeave={hideCross}
                    className="add-modal-file-wrap"
                    key={file.name}
                  >
                    <span>{file.name}</span>
                    <span
                      onClick={() => removeFile(file.name)}
                      className={hoveredFile === file.name ? show : ''}
                    >
                      <RxCross2 />
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <label htmlFor="fileInput">+ Add attachments</label>
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  onChange={handleFileInput}
                />
              </div>
            </div>
            <div className="add-modal-description">
              <h2>DESCRIPTION</h2>
              <div>
                <textarea
                  rows={1}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter description for task"
                ></textarea>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button isDisabled={loading} size="sm" onClick={saveTask}>
              {!loading ? 'Save' : <Spinner size="md" color="white.500" />}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
