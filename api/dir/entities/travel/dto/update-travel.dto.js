"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTravelDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_travel_dto_1 = require("./create-travel.dto");
class UpdateTravelDto extends (0, mapped_types_1.PartialType)(create_travel_dto_1.CreateTravelDto) {
}
exports.UpdateTravelDto = UpdateTravelDto;
//# sourceMappingURL=update-travel.dto.js.map