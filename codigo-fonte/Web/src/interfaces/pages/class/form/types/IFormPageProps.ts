import { IClasseEntity } from "../../../../../domain/entities/IClasseEntity";

export interface IFormPageProps {
	params: {
		classId?: IClasseEntity['id'];
	};
}
