import { FaPizzaSlice, FaHamburger} from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import {NavLink} from  'react-router-dom';


function Category(){
    return (
        <List>
            <SLink to={'/Cuisine/Italian'}>
                <FaPizzaSlice/>
                <h4>Italian</h4>
            </SLink>
            <SLink to={'/Cuisine/American'} >
                <FaHamburger/>
                <h4>American</h4>
            </SLink>
            <SLink to={'/Cuisine/Thai'} >
                <GiNoodles/>
                <h4>Thai</h4>
            </SLink>
            <SLink to={'/Cuisine/Japanese'} >
                <GiChopsticks/>
                <h4>Japanese</h4>
            </SLink>
            
        </List>
    )
}

const List = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0rem;
  flex-wrap: wrap;
  gap: 1rem;
`;


const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  background: linear-gradient(35deg, #494949, #313131);
  width: 6rem;
  height: 6rem;
  cursor: pointer;
  transform: scale(0.9);
  transition: all 0.3s ease;

  h4 {
    color: white;
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }

  svg {
    color: white;
    font-size: 1.5rem;
  }

  &.active {
    background: linear-gradient(to right, #f27121, #e94057);
  }


  @media (max-width: 768px) {
    width: 5rem;
    height: 5rem;

    h4 {
      font-size: 0.7rem;
    }

    svg {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    width: 4.2rem;
    height: 4.2rem;

    h4 {
      font-size: 0.65rem;
    }

    svg {
      font-size: 1.1rem;
    }
  }
`;


export default Category;