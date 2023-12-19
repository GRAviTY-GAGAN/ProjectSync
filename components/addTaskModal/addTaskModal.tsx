import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import './addTaskModal.scss';
import Image from 'next/image';
import trendingUp from '../../assets/icons/material-trending-up.svg';
import labelIcon from '../../assets/icons/material-label.svg';
import { FaRegCalendar, FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const AddTaskModal = ({ isOpen, onClose }: any) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [labelValue, setLabelValue] = useState<string>('');
  const [filesSelected, setFilesSelected] = useState<File[]>([]);
  const [show, setShow] = useState<string>('show');
  const [hoveredFile, setHoveredFile] = useState<string>('');
  const [hoveredlabel, setHoveredLabel] = useState<string>('');

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
    files = files.filter(file => fileName !== file.name);
    setFilesSelected(files);
  }

  function removeLabel(labelName: string) {
    let newLabels = labels;
    newLabels = newLabels.filter((label, i) => label + i !== labelName);
    setLabels(newLabels);
  }

  return (
    <div>
      <Modal size={'xl'} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="add-task-title">
            Project Name / Task ID -1404
          </ModalHeader>
          <ModalCloseButton className="add-task-close" />
          <ModalBody>
            <div className="add-modal-task-title">
              <input type="text" placeholder="Enter task title" />
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
                  <select>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
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
                    <FaRegUser />
                  </div>
                  <div>Owner</div>
                </div>
                <div className="add-modal-values">
                  <select>
                    <option value="">Select Owner</option>
                    <option value="James Green">James Green</option>
                    <option value="Emma Willis ">Emma Willis </option>
                    <option value="Tom Grey">Tom Grey</option>
                  </select>
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
                  <select>
                    <option value="">Select Assignee</option>
                    <option value="James Green">James Green</option>
                    <option value="Emma Willis ">Emma Willis </option>
                    <option value="Tom Grey">Tom Grey</option>
                  </select>
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
                  <input type="date" />
                </div>
              </div>
            </div>
            <div className="add-modal-attachments">
              <h2>Attachments</h2>
              <div className="add-modal-files">
                {filesSelected.map(file => (
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
                  placeholder="Enter description for task"
                ></textarea>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" colorScheme="blue" onClick={closeModal}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddTaskModal;
