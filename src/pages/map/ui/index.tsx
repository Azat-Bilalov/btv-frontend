import React, { useState, useEffect} from 'react';
import { Button } from '@/shared/ui/button';
import { ButtonType } from '@/shared/ui/button/types';
import { BankInfo } from '@/widgets/bank-info';

export const Map: React.FC = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const openInfo = () => {
    console.log("open Info");
    setIsInfoVisible(true);
  };

  const closeInfo = () => {
    setIsInfoVisible(false);
  };

  return (
    <div>
      Здесь будет карта, ну пожалуйста
      {/* <Button type={ButtonType.Secondary} onClick={openInfo}>Инфа приди</Button> */}
      <button onClick={openInfo}>Инфа приди</button>
      <BankInfo isVisible={isInfoVisible} onClose={closeInfo} />
    </div>
  );
};
