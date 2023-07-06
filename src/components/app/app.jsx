import { useEffect, useState } from "react";


import Loader from "../loader/loader";
import Modal from "../modal/modal";
import Overlay from "../overlay/overlay";

import AppHeader from '../app-header/app-header'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'

import { data } from "../../utils/data";

import styles from "./app.module.css";

const baseUrl = 'https://norma.nomoreparties.space/api/ingredients'

function App() {

  const [ingredients, setIngredients] = useState(data)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [cardData, setCardData] = useState(null);
  
  const [currentModal, setCurrentModal] = useState(null);



  const openModal = (modalType, data) => {
    setIsModalOpen(true);
    setCurrentModal(modalType);
    setCardData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal(null);
    setCardData(null);
  };




  useEffect(() => {
    setIsLoading(true)

    fetch(baseUrl)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data.data)
        // console.log(data.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false) )
  }, [])




  return (
    <div className={styles.app}>
        <AppHeader/>

        {isLoading ? <Loader />: 
          <main className={styles.main}>
          <BurgerIngredients 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
            setCardData={setCardData}
            openModal={openModal}
          />
          <BurgerConstructor 
            ingredients={ingredients} 
            openModal={openModal}
          />
        </main>
        } 
        {isModalOpen && (
          <>
            <Modal closeModal={closeModal} cardData={cardData} currentModal={currentModal}/>


            <Overlay setIsModalOpen={setIsModalOpen}/>
          </>
        )}
    </div>
  );
}

export default App;


