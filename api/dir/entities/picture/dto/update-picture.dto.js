"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePictureDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_picture_dto_1 = require("./create-picture.dto");
class UpdatePictureDto extends (0, mapped_types_1.PartialType)(create_picture_dto_1.CreatePictureDto) {
}
exports.UpdatePictureDto = UpdatePictureDto;
//# sourceMappingURL=update-picture.dto.js.map