import { type FC } from 'react';
import type {
    AutoItemParams,
    ElectronicsItemParams,
    RealEstateItemParams,
} from '../../types/item';
import { needsRevision } from '../../utils/needsRevision';
import { RiErrorWarningFill } from 'react-icons/ri';

interface IRevision {
    description: string;
    item:
        | { category: 'auto'; params: AutoItemParams }
        | { category: 'real_estate'; params: RealEstateItemParams }
        | { category: 'electronics'; params: ElectronicsItemParams };
}

const Revision: FC<IRevision> = ({ description, item }) => {
    const revisions = needsRevision(description, item);
    return (
        <div className=" flex rounded-2xl bg-amber-50 shadow-lg h-fit w-fit p-4 gap-3">
            <RiErrorWarningFill className="text-amber-600 mt-1" />
            <div>
                <p className="font-medium">Требуются доработки</p>
                <p>У объявления не заполнены поля:</p>
                {revisions.map((rev) => {
                    return (
                        <p key={rev} className="ml-3">
                            {'• ' + rev}
                        </p>
                    );
                })}
            </div>
        </div>
    );
};

export default Revision;
