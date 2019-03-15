import Contract from './components/Contract';
import { drizzleConnect } from 'drizzle-react';

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = (state, props) => {
  return {
    accounts: state.accounts,
    SimpleStorage: state.contracts.SimpleStorage,
    TutorialToken: state.contracts.TutorialToken,
    drizzleStatus: state.drizzleStatus,
    Ballot: state.contracts.Ballot
  }
}

const ContractContainer = drizzleConnect(Contract);

export default ContractContainer;